export type Category = {
	title: string;
	id: string;
	icon: string;
};

export const categories: Category[] = [
	{title: '웹 디자인', id: 'WEB_DESIGN', icon: 'brush-2-line'},
	{title: 'UI/UX', id: 'UI_UX', icon: 'layout-2-line'},
	{title: '프로덕트 매니저', id: 'PRODUCT_MANAGER', icon: 'file-list-2-line'},
	{title: '백엔드', id: 'BACKEND', icon: 'send-to-back'},
	{title: '프론트엔드', id: 'FRONTEND', icon: 'bring-to-front'},
	{title: '데브옵스', id: 'DEVOPS', icon: 'cloud-line'},
	{title: '데이터 엔지니어', id: 'DATA_ENGINEER', icon: 'database-2-line'},
	{title: '서버 엔지니어', id: 'SERVER_ENGINEER', icon: 'server-line'},
	{title: 'AI', id: 'AI', icon: 'robot-3-line'},
];
