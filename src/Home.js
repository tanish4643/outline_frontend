import React, {Component} from 'react';
import {connect} from 'react-redux'
import './App.css';

import {fetchEmployees, fetchSurveys, fetchUpdate} from './redux/actions';
import {employeesSelector, surveysSelector, updateSelector} from './redux/selector';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			employees: [],
			surveys: [],
			surveysList: [],
			employeeSurveys: [],
			error: false,
			selectedEmployee: -1,
			msgShow: true,
			msg: "Loading Data...",
		};
	}

	componentDidMount(){
		this.props.fetchEmployees();
		this.props.fetchSurveys();
	}

	componentWillReceiveProps(newProps){
		if((newProps.employees == undefined && newProps.surveys == undefined) || (newProps.update === undefined)){
			this.setState({
				msg: "Something went wrong, please try again.",
				msgShow: true,
				error: true
			});
			setTimeout(() => {
				this.setState({msgShow: false, error: false});
			}, 2000);
		}
		else{
			if(newProps.employees && newProps.surveys)
				this.setState({
					employees: newProps.employees,
					surveys: newProps.surveys,
					msgShow: false
				});
		}
	}

	onEmployeeSelect(e){
		var eid = e.target.value;
		var employeeSurveys = [];
		var surveysList = [];

		if(eid != -1){
			var eSurveys = this.state.employees.find(obj => { return obj.id == eid}).surveys;
			var surveys = this.state.surveys;

			for(var i=0; i<surveys.length; i++){
				if(eSurveys.includes(surveys[i].id))
					employeeSurveys.push(surveys[i]);
				else if(!surveys[i].assigned)
					surveysList.push(surveys[i]);
			}
		}

		this.setState({
			employeeSurveys: employeeSurveys,
			surveysList: surveysList,
			selectedEmployee: eid
		});
	}

	updateSurvey(sid, action, index){
		var eid = this.state.selectedEmployee;
		var employeeSurveys = this.state.employeeSurveys;
		var surveysList = this.state.surveysList;
		var params = {};
		var employees = this.state.employees;
		var eSurveys = this.state.employees.find(obj => { return obj.id == eid}).surveys;

		if(action == 0){
			eSurveys.push(sid);
			employeeSurveys.push(surveysList[index]);
			surveysList.splice(index, 1);
			employees = employees.map(item => item.id == eid ? {...item, surveys: eSurveys} : item);
		}else{
			eSurveys = eSurveys.filter(item => item != sid);
			surveysList.push(employeeSurveys[index]);
			employeeSurveys.splice(index, 1);
			employees = employees.map(item => item.id == eid ? {...item, surveys: eSurveys} : item);
		}

		var surveys = this.state.surveys.map(item => item.id == sid ? {...item, assigned: !item.assigned} : item);

		this.props.fetchUpdate({ sid: sid, eid: this.state.selectedEmployee, action: action });
		this.setState({
			employeeSurveys: employeeSurveys, 
			surveysList: surveysList,
			msgShow: true,
			msg: "Updating your action on server...",
			surveys: surveys
		});
	}

	render(){
		const {employees, surveys, surveysList, employeeSurveys, error} = this.state;

		return(
			<div className="container is-fluid">
				{
					this.state.msgShow
					?
					<div className={ error ? "notification is-danger" : "notification is-primary"}>
						{this.state.msg}
					</div> : null
				}
				<h1 className="subtitle">Select Employee</h1>
				<div className="center-select">
					<div className="select">
	  					<select onChange={(e) => this.onEmployeeSelect(e)} value={this.state.selectedEmployee}>
					    	<option value={-1}>Select Employee</option>
					    	{employees.map((item,index) => {
					    		return(
					    			<option key={index} value={item.id}>{item.name}</option>
					    		)
					    	})}
					    </select>
					</div>
				</div>
				<div className="columns is-centered">
				  	<div className="column is-two-fifths">
				  		<div className="table-container">
					    	<table className="table is-bordered is-hoverable is-fullwidth">
					    		<thead>
					    			<tr>
					    				<td style={{border:0}}><p className="subtitle is-5 is-centered">Survey List</p></td>
					    			</tr>
					    		</thead>
					    		<tbody>
					    			{
						    			surveysList.length != 0
						    			?
							    		<tr>
							    			<td>
							    				<div className="field" style={{width: '100%'}}>
													<p className="control has-icons-right">
														<input 	className="input" type="text" placeholder="Search"
																value={this.state.surveySearch} 
																onChange={(e) => this.setState({surveySearch: e.target.value})} />
														<span className="icon is-small is-right">
														  	<i className="fas fa-search"></i>
														</span>
													</p>
												</div>	
							    			</td>
							    		</tr> : null
						    		}
					    			<tr>
					    				{surveysList.map((item,index) => {
					    					return(
					    						<td key={index}>
							    					<p>{item.name}</p>
							    					<button onClick={() => this.updateSurvey(item.id, 0, index)} className="button is-text">{"+Add"}</button>
							    				</td>
					    					)
					    				})}
					    			</tr>
					    			{
						    			surveysList.length == 0
						    			?
							    		<tr>
							    			<td><p className="subtitle is-6 is-centered">{"No Survey(s) Present"}</p></td>
							    		</tr> : null
						    		}
					    		</tbody>
					    	</table>
					    </div>
				  	</div>
				  	<div className="column is-two-fifths">
				    	<div className="table-container">
					    	<table className="table is-bordered is-hoverable is-fullwidth">
					    		<thead>
					    			<tr>
					    				<td style={{border:0}}><p className="subtitle is-5 is-centered">Assigned Surveys</p></td>
					    			</tr>
					    		</thead>
					    		<tbody>
					    			<tr>
					    				{employeeSurveys.map((item,index) => {
					    					return(
					    						<td key={index}>
							    					<p>{item.name}</p>
							    					<button onClick={() => this.updateSurvey(item.id, 1, index)} className="button is-text">{"-Remove"}</button>
							    				</td>
					    					)
					    				})}
					    			</tr>
					    			{
						    			employeeSurveys.length == 0
						    			?
							    		<tr>
							    			<td><p className="subtitle is-6 is-centered">{"No Survey(s) Added"}</p></td>
							    		</tr> : null
						    		}
					    		</tbody>
					    	</table>
					    </div>
				  	</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function mapStateToProps (state) {
    return {
        employees: employeesSelector(state),
        surveys: surveysSelector(state),
        update: updateSelector(state),
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchEmployees: () => dispatch(fetchEmployees()),
        fetchSurveys: () => dispatch(fetchSurveys()),
        fetchUpdate: (params) => dispatch(fetchUpdate(params)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);