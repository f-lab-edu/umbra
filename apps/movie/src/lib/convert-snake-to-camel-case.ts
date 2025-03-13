// 스네이크 케이스 체크
const checkSnakeCase = (key: string): boolean => {
  const snakeCaseRegex = /^[a-z]+(_[a-z]+)*$/;
  return snakeCaseRegex.test(key);
};

// _ 뒤에 오는 문자를 대문자로 변환
const changeSnakeToCamelCase = (key: string): string => {
  return key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
};

const convertSnakeToCamelCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((value) => convertSnakeToCamelCase(value));
  }

  if (data !== null && typeof data === 'object') {
    const newObj: Record<string, any> = {};

    Object.keys(data).forEach((key) => {
      const newKey = checkSnakeCase(key) ? changeSnakeToCamelCase(key) : key;
      newObj[newKey] = convertSnakeToCamelCase(data[key]);
    });

    return newObj;
  }

  // 배열도 객체도 아닌 원시형 데이터(숫자, 문자열, 불리언)
  return data;
};

export { convertSnakeToCamelCase };
