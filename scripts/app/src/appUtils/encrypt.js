import sha256 from 'sha256';

const encrypt = (password: string, email: string) => sha256(password + email);

export default encrypt;
