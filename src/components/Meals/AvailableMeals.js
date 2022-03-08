import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-chooks-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Somthing went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };


    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.mealsError}>
        <p>{httpError}.</p>
      </section>
    );
  }

  const mealsList = meals.map(meal => (
    <MealItem meal={meal} key={meal.id} />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;