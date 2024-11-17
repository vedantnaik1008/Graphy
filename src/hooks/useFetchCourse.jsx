import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { database } from '../FirebaseConfig';

const useFetchCourse = ({course, isEditing}) => {
 
    const [courseList, setCourseList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formCourse, setFormCourse] = useState(null)
    const {userId} = useParams()

    useEffect(() => {
        if(isEditing){
            const tabsRef = ref(database, `users/${userId}/course`);

        const unsubscribe = onValue(
            tabsRef,
            (snapshot) => {
                setLoading(false);
                if (snapshot.exists()) {
                    setCourseList(snapshot.val());
                } else {
                    console.log('No data available');
                }
            },
            (error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
        }
    }, [isEditing, userId]);

    useEffect(() => {
        const tabsRef = ref(database, course);

        const unsubscribe = onValue(
            tabsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setFormCourse(snapshot.val());
                } else {
                    console.log('No data available');
                }
            },
            (error) => {
                console.error('Error fetching data:', error);
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [course]);
   


  return { courseList , loading, formCourse };
}

export default useFetchCourse
