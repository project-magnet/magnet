package com.example.magnet.global.config;

import com.example.magnet.global.auth.filter.JwtAuthenticationFilter;
import com.example.magnet.global.auth.filter.JwtVerificationFilter;
import com.example.magnet.global.auth.handler.*;
import com.example.magnet.global.auth.jwt.JwtTokenizer;
import com.example.magnet.global.auth.utils.CustomAuthorityUtils;
import com.example.magnet.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity(debug = true) // filter 호출 순서 반환
@Slf4j
public class SecurityConfig {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final Logger logger = LoggerFactory.getLogger(getClass());


    public SecurityConfig(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils
    ) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;

    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .headers((headers) -> headers.frameOptions(Customizer.withDefaults()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))// spring security가 세션을 생성하지 않도록 설정
                .exceptionHandling((exceptionHandling) ->
                        exceptionHandling.authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                                .accessDeniedHandler(new MemberAccessDeniedHandler()))
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/health", "member/signup", "auth/login", "/login/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/mentor/create").hasAnyRole("USER","MENTOR")
                        .requestMatchers("/mentor/list").permitAll()
                        .requestMatchers("/mentee/create").hasAnyRole("USER","MENTEE","MENTOR")
                        .requestMatchers("/mentee/**").hasRole("MENTEE")
                        .requestMatchers("/member/**").hasAnyRole("ADMIN","USER","MENTOR","MENTEE")
                        .requestMatchers("/member/extract").permitAll()
                        .requestMatchers("/mentoring/create").hasAnyRole("MENTOR")
                        .requestMatchers("/mentoring/get/**","/mentoring/list").permitAll()
                        .requestMatchers("/api/v1/payments/**").permitAll()
                        .anyRequest().authenticated() //그 외 나머지는 인증 완료 후 접근 가능
                )
                .with(new CustomFilterConfigurer(), Customizer.withDefaults()) // apply(new CustomFilterConfigurer) 로그인 경로 삽입
                .cors((cors) -> cors
                        .configurationSource(corsConfigurationSource()))
                .httpBasic(AbstractHttpConfigurer::disable) // .httpBasic((httpBasic) -> httpBasic.disable())
                .exceptionHandling(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .oauth2Login(oauth2 -> oauth2.successHandler(OAuth2MemberSuccessHandler.builder().jwtTokenizer(jwtTokenizer).authorityUtils(authorityUtils).build()));

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager( // 인증 매니저 설정
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authenticationProvider);
    }


    @Bean
    public PasswordEncoder passwordEncoder() { // 기본적인 패스워드 인코딩 생성
        return PasswordEncoderFactories.createDelegatingPasswordEncoder(); // DelegatingPasswordEncoder가 실질적으로 PasswordEncoder 구현 객체를 생성
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true); // option요청에 Access-Control-Allow-Origin 추가 > 403 문제 발생
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "https://ef14-14-5-74-92.ngrok-free.app"));   // 모든 출처 허용
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE","OPTIONS"));  // http 통신 허용
        configuration.setAllowedHeaders(List.of("*"));// 문제 해결
        configuration.setExposedHeaders(List.of("Authorization", "RefreshToken","Access-Control-Allow-Origin"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 url 앞에서 구성한 cors 정책 적용
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            logger.info("securityConfigurer 간에 공유되는 객체 획득");
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            logger.info("authenticationManager, jwtTokenizer DI");
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            logger.info("디폴트 request URL 변경. 로그인 경로 설정 완료" );

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new LoginAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new LoginAuthenticationFailureHandler());
            logger.info("jwtAuthenticationFilter에 핸들러 등록 완료" );

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class); // jwtVerificationFilter 이후에 와야한다는 의미

            logger.info("jwtVerificationFilter 뒤에 로컬 로그인, oauth2 검증 필터 추가");
        }
    }
}
