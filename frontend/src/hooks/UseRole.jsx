import { useState } from "react";


const UseRole = () => {
    const [role, setRole] = useState('');
    const student = () => {
        setRole('student')
    }

    const teacher = () => {
        setRole('teacher');
    };

  return {role, student, teacher}
}

export default UseRole
