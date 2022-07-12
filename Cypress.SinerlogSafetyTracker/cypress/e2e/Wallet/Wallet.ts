import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given(/^i want to do a package transaction$/, () => {
	return true;
});

Then(/^the following tenant exists$/, () => {
	return true;
});

Then(/^the following service line also exists$/, () => {
	return true;
});

When(/^i get the before package transaction tenant balance$/, () => {
	return true;
});

When(/^set the following data to create a package: service type: "([^"]*)", currency: "([^"]*)", delivery type: "([^"]*)"$/, (args1,args2,args3) => {
	console.log(args1,args2,args3);
	return true;
});

When(/^a province and zipcode that "([^"]*)" ICMS like "([^"]*)" and "([^"]*)"$/, (args1,args2,args3) => {
	console.log(args1,args2,args3);
	return true;
});

When(/^send a package create request$/, () => {
	return true;
});

When(/^wait for the Wallet integration$/, () => {
	return true;
});

When(/^get the after transaction tenant balance$/, () => {
	return true;
});

Then(/^the balance diff must be "([^"]*)"$/, (args1) => {
	console.log(args1);
	return true;
});
