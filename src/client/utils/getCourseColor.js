import stringToColor from 'string-to-color';

const getCourseColor = (course) => stringToColor(course.code);

export default getCourseColor;
