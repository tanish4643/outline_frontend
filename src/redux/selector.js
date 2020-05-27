import { createSelector } from 'reselect';

const salesSelector = state => state.sales;
const employeesSelector = createSelector([salesSelector], sales => sales.get('employees'));
const surveysSelector = createSelector([salesSelector], sales => sales.get('surveys'));
const updateSelector = createSelector([salesSelector], sales => sales.get('update'));


export {
  	employeesSelector,
  	surveysSelector,
	updateSelector
}
