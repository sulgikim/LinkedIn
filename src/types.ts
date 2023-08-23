export type Post = {
    id: string;
    content: string;
    image?: string; //can be string or missing (optional)
    likes: number;
    author: User;
};

export type User = {
    id: string;
    name: string; 
    position: string;
    image?: string;
    backImage?: string;
    about?: string;
    experience?: Experience[]
};

export type Experience = {
    id: string; 
    title: string;
    companyName: string;
    companyImage: string;
}