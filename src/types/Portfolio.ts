export interface Card {
  title: string;
  period: string;
  skills: string;
  description: string;
  repositoryLink: string;
}

export interface FormValues {
  name: string;
  linkedin: string;
  bio: string;
  email: string;
}

export interface UserData {
    avatar_url: string;
    name: string;
    login: string;
    location: string;
    email: string;
    bio: string;
    html_url: string;
  }