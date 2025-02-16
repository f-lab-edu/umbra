const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

if (!process.env.TMDB_API_KEY) {
  console.warn('\x1b[33m%s\x1b[0m', '[Warning] ⚠️ .env 파일에 TMDB_API_KEY 환경변수가 설정되지 않았습니다.');
  process.exit(1); // 실행 중지
}
