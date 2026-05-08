export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  linkedin?: string;
  github?: string;
  twitter?: string;
  image?: string;
};

export const authorsData: Record<string, Author> = {
  'redops-operator': {
    slug: 'redops-operator',
    name: 'RedOps Senior Operator',
    role: 'Senior Offensive Security Practitioner',
    bio: 'Lead operator at RedOps Security with over 8 years of experience in manual penetration testing, red teaming, and exploit development. Specialist in Active Directory exploitation and cloud infrastructure security.',
    credentials: ['OSCP', 'OSCE', 'CRT', 'CISP'],
    linkedin: 'https://www.linkedin.com/company/redops-security',
    github: 'https://github.com/redops-security',
  }
};
