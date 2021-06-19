import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import '../styles/Stepper.css';

import OrgBox from './OrgBox';
import ProviderBox from './ProviderBox';
import ServiceBox from './ServiceBox';
import ServiceTable from './ServiceTable';
import ProviderTable from './ProviderTable';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

function getSteps() {
	return ['Get Started', 'Add Providers', 'Add Services', 'Review'];
}

function getStepContent(step) {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
	switch (step) {
		case 0:
			return (
				<div style={{ width: '100%' }}>
					<br />
					<br />
					<h3 id="org-head">
						Get started with your <strong>name and location</strong>
					</h3>
					<br />
					<div className="text-center">
						<OrgBox />
					</div>
				</div>
			);
		case 1:
			return (
				<div>
					<ProviderBox />
				</div>
			);
		case 2:
			return (
				<div>
					<ServiceBox />
				</div>
			);
		case 3:
			return (
				<div style={{ width: '90%', margin: 'auto auto', display: 'block' }}>
					<h3 style = {{marginTop:"60px"}}>
					Confirm<strong> Details</strong>
					</h3>
					<br></br>
					<ProviderTable />
					<br></br>
					<br></br>
					<hr></hr>
					<br></br>
					<br></br>
					<ServiceTable />
				</div>
			);
		default:
			return 'Unknown step';
	}
}

export default function HorizontalLinearStepper() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const steps = getSteps();

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSubmit = () => {
		// setActiveStep(0);
		// Show congo page
	};

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} elevation={4} style={{ backgroundColor: '#fafafa' }}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};

					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Button onClick={handleSubmit} className={classes.button}>
							Reset
						</Button>
					</div>
				) : (
					<div>
						<div>{getStepContent(activeStep)}</div>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
								Back
							</Button>

							<Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
