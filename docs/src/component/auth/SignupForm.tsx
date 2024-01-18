import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
  });
  // 유효성 검사
  const [checkForm, setCheckForm] = useState({
    email: { focused: false, validated: false },
    name: { focused: false, validated: false },
    password: { focused: false, validated: false },
    confirmPassword: { focused: false, validated: false },
    nickname: { focused: false, validated: false },
    phoneNumber: { focused: false, validated: false },
  });
  //

  const handleSignup = () => {
    console.log(form);
  };

  const validateEmail = (vlaue: string) => {
    setForm({ ...form, email: vlaue });
    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(vlaue)) {
      setCheckForm({ ...checkForm, email: { ...checkForm.email, validated: true } });
    } else {
      setCheckForm({ ...checkForm, email: { ...checkForm.email, validated: false } });
    }
  };
  const validateName = (value: string) => {
    setForm({ ...form, name: value });
    if (/^[A-Za-z\s]{2,}$/.test(value)) {
      setCheckForm({ ...checkForm, name: { ...checkForm.name, validated: true } });
    } else {
      setCheckForm({ ...checkForm, name: { ...checkForm.name, validated: false } });
    }
  };
  const validateNickname = (value: string) => {
    setForm({ ...form, nickname: value });
    // 원하는 닉네임 유효성 검사 정규식을 사용하세요
    // 예시: 최소 3글자 이상, 영문 대소문자와 숫자만 허용
    if (/^[A-Za-z0-9]{3,}$/.test(value)) {
      setCheckForm({ ...checkForm, nickname: { ...checkForm.nickname, validated: true } });
    } else {
      setCheckForm({ ...checkForm, nickname: { ...checkForm.nickname, validated: false } });
    }
  };
  const validatePhoneNumber = (value: string) => {
    setForm({ ...form, phoneNumber: value });
    // 원하는 전화번호 유효성 검사 정규식을 사용하세요
    // 예시: 숫자만 허용하고, 특정 길이 제한 등
    if (/^[0-9]{10,}$/.test(value)) {
      setCheckForm({ ...checkForm, phoneNumber: { ...checkForm.phoneNumber, validated: true } });
    } else {
      setCheckForm({ ...checkForm, phoneNumber: { ...checkForm.phoneNumber, validated: false } });
    }
  };

  const validatePassword = (value: string) => {
    setCheckForm(prevState => {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        return { ...prevState, password: { ...prevState.password, validated: true } };
      } else {
        return { ...prevState, password: { ...prevState.password, validated: false } };
      }
    });
  };

  const validateConfirmPassword = (value: string) => {
    setCheckForm(prevState => {
      if (value === form.password) {
        return {
          ...prevState,
          confirmPassword: { ...prevState.confirmPassword, validated: true },
        };
      } else {
        return {
          ...prevState,
          confirmPassword: { ...prevState.confirmPassword, validated: false },
        };
      }
    });
  };

  useEffect(() => {
    const validateAndSetPassword = () => {
      validatePassword(form.password);
      validateConfirmPassword(form.confirmPassword);
    };

    validateAndSetPassword();
  }, [form.password, form.confirmPassword]);

  return (
    <section className="w-[500px] h-full flexCol items-center justify-center">
      <div className="mt-4">
        <p className="text-slate-600 text-sm m-1">이메일</p>
        <input
          className="input"
          placeholder="이메일을 입력하세요."
          value={form.email}
          onChange={e => validateEmail(e.target.value)}
          onFocus={() =>
            setCheckForm({ ...checkForm, email: { ...checkForm.email, focused: true } })
          }
        />
        {checkForm.email.focused && (
          <>
            {checkForm.email.validated ? (
              <p className="text-green-500 text-xs">올바른 이메일 형식입니다.</p>
            ) : (
              <p className="text-red-500 text-xs">이메일 형식이 올바르지 않습니다.</p>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        <p className="text-slate-600 text-sm m-1">이름</p>
        <input
          className="input"
          placeholder="이름을 입력하세요."
          value={form.name}
          onChange={e => validateName(e.target.value)}
          onFocus={() => setCheckForm({ ...checkForm, name: { ...checkForm.name, focused: true } })}
        />
        {checkForm.name.focused && (
          <>
            {checkForm.name.validated ? (
              <p className="text-green-500 text-xs">올바른 이름 형식입니다.</p>
            ) : (
              <p className="text-red-500 text-xs">이름 형식이 올바르지 않습니다.</p>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        <p className="text-slate-600 text-sm m-1">닉네임</p>
        <input
          className="input"
          placeholder="닉네임을 입력하세요."
          value={form.nickname}
          onChange={e => validateNickname(e.target.value)}
          onFocus={() =>
            setCheckForm({ ...checkForm, nickname: { ...checkForm.nickname, focused: true } })
          }
        />
        {checkForm.nickname.focused && (
          <>
            {checkForm.nickname.validated ? (
              <p className="text-green-500 text-xs">올바른 닉네임 형식입니다.</p>
            ) : (
              <p className="text-red-500 text-xs">닉네임 형식이 올바르지 않습니다.</p>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        <p className="text-slate-600 text-sm m-1">전화번호</p>
        <input
          className="input"
          placeholder="전화번호를 입력하세요."
          value={form.phoneNumber}
          onChange={e => validatePhoneNumber(e.target.value)}
          onFocus={() =>
            setCheckForm({ ...checkForm, phoneNumber: { ...checkForm.phoneNumber, focused: true } })
          }
        />
        {checkForm.phoneNumber.focused && (
          <>
            {checkForm.phoneNumber.validated ? (
              <p className="text-green-500 text-xs">올바른 전화번호 형식입니다.</p>
            ) : (
              <p className="text-red-500 text-xs">전화번호 형식이 올바르지 않습니다.</p>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        <p className="text-slate-600 text-sm m-1">비밀번호</p>
        <input
          type="password"
          className="input"
          placeholder="비밀번호를 입력하세요."
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onFocus={() =>
            setCheckForm({ ...checkForm, password: { ...checkForm.password, focused: true } })
          }
        />
        {checkForm.password.focused && (
          <>
            {checkForm.password.validated ? (
              <p className="text-green-500 text-xs">올바른 비밀번호 형식입니다.</p>
            ) : (
              <p className="text-red-500 text-xs">
                최소 8자 이상, 영문과 숫자를 모두 포함해야 합니다.
              </p>
            )}
          </>
        )}
      </div>
      <div className="mt-1">
        <input
          type="password"
          className="input"
          placeholder="비밀번호를 다시 입력하세요."
          value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        />
        {checkForm.password.validated && (
          <>
            {checkForm.confirmPassword.validated ? (
              <p className="text-green-500 text-xs">비밀번호가 일치합니다.</p>
            ) : (
              <p className="text-red-500 text-xs">비밀번호가 일치하지 않습니다.</p>
            )}
          </>
        )}
      </div>

      {checkForm.email.validated &&
      checkForm.password.validated &&
      checkForm.name.validated &&
      checkForm.phoneNumber.validated &&
      checkForm.nickname.validated &&
      checkForm.confirmPassword.validated ? (
        <button
          type="button"
          onFocus={handleSignup}
          className="w-96 h-12 text-white bg-blue-500 rounded-lg mt-10"
        >
          회원가입
        </button>
      ) : (
        <button
          disabled
          type="button"
          className="w-96 h-12 text-white bg-blue-100 rounded-lg mt-10"
        >
          회원가입
        </button>
      )}
      <Link to="/loginemail">
        <p className="text-sm text-slate-400 mt-3">로그인으로 돌아가기</p>
      </Link>
    </section>
  );
};

export default SignupForm;
