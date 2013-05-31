App = Ember.Application.create();

App.Router.map(function() {
  this.resource('consultants');
});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('consultants');
	}
});

App.ConsultantsRoute = Ember.Route.extend({
	model: function() {
		return App.Consultant.findAll();
	}
});

App.ConsultantsController = Ember.ArrayController.extend({
	baseHours: 45,
	months: function() {
		return App.Month.findAll();
	}.property()
});

App.UtilizationController = Ember.ObjectController.extend({
	needs: ["consultants"],

	capacity: function() {
		return this.get('controllers.consultants.baseHours') - this.get('model').get('utilization');
	}.property('controllers.consultants.baseHours', 'model.utilization')
});

// Models
App.Month = Ember.Object.extend({
	label: null,
	weeks: Ember.A([])
});

App.Month.reopenClass({
	findAll: function() {
		return months;
	}
});

App.Week = Ember.Object.extend({
	number: null,
	label: null	
});

App.Consultant = Ember.Object.extend({
	firstName: null,
	lastName: null,
	schedule: Ember.A([]),
	
	lastFirst: function() {
		return this.get('lastName') + ', ' + this.get('firstName');
	}.property('lastName', 'firstName')
});

App.Consultant.reopenClass({
	findAll: function() {
		return consultants;
	}
});

App.ConsultantSchedule = Ember.Object.extend({
	week: null,
	projects: Ember.A([]),

	utilization: function() {
		var sumHours = function(previousValue, item) {
			return previousValue + item.get('hours');
		};
		return this.get('projects').reduce(sumHours, 0);
	}.property('projects.@each.hours')
});

App.ConsultantUtilization = Ember.Object.extend({
	project: null,
	hours: 0
});

// Fake Data
var months = Ember.A([
	App.Month.create({
		label: 'M1',
		weeks: Ember.A([
			App.Week.create({number: 1, label: 'M1 W3'}),
			App.Week.create({number: 2, label: 'M1 W4'})
		])
	}),
	App.Month.create({
		label: 'M2',
		weeks: Ember.A([
			App.Week.create({number: 3, label: 'M2 W1'}),
			App.Week.create({number: 4, label: 'M2 W2'}),
			App.Week.create({number: 5, label: 'M2 W3'}),
			App.Week.create({number: 6, label: 'M2 W4'})
		])
	})
]);

var consultants = Ember.A([
	App.Consultant.create({
		lastName: 'Hogan',
		firstName: 'Jay',
		schedule: Ember.A([
			App.ConsultantSchedule.create({
				week: 1,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 5})
				])
			}),
			App.ConsultantSchedule.create({
				week: 2,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 10})
				])
			}),
			App.ConsultantSchedule.create({
				week: 3,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 15})
				])
			}),
			App.ConsultantSchedule.create({
				week: 4,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 20})
				])
			}),
			App.ConsultantSchedule.create({
				week: 5,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 25})
				])
			}),
			App.ConsultantSchedule.create({
				week: 6,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 8})
				])
			})
		])
	}),
	App.Consultant.create({
		lastName: 'Tashner',
		firstName: 'Dave',
		schedule: Ember.A([
			App.ConsultantSchedule.create({
				week: 1,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 5})
				])
			}),
			App.ConsultantSchedule.create({
				week: 2,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 5}),
					App.ConsultantUtilization.create({project: 2, hours: 5})
				])
			}),
			App.ConsultantSchedule.create({
				week: 3,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 5}),
					App.ConsultantUtilization.create({project: 2, hours: 5}),
					App.ConsultantUtilization.create({project: 3, hours: 5})
				])
			}),
			App.ConsultantSchedule.create({
				week: 4,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 5}),
					App.ConsultantUtilization.create({project: 2, hours: 5}),
					App.ConsultantUtilization.create({project: 3, hours: 5}),
					App.ConsultantUtilization.create({project: 4, hours: 5})
				])
			}),
			App.ConsultantSchedule.create({
				week: 5,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 5}),
					App.ConsultantUtilization.create({project: 2, hours: 5}),
					App.ConsultantUtilization.create({project: 3, hours: 5}),
					App.ConsultantUtilization.create({project: 4, hours: 5}),
					App.ConsultantUtilization.create({project: 5, hours: 5})
				])
			}),
			App.ConsultantSchedule.create({
				week: 6,
				projects: Ember.A([
					App.ConsultantUtilization.create({project: 1, hours: 5}),
					App.ConsultantUtilization.create({project: 2, hours: 5}),
					App.ConsultantUtilization.create({project: 3, hours: 5}),
					App.ConsultantUtilization.create({project: 4, hours: 5}),
					App.ConsultantUtilization.create({project: 5, hours: 5}),
					App.ConsultantUtilization.create({project: 6, hours: 5})
				])
			})
		])
	})
]);
