import stringToColor from 'string-to-color';

const getCourseColor = (course) => stringToColor(course.id);

export default getCourseColor;
