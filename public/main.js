'use strict';

const MOCK_FORM_DATA_ADMIN = {
    'forms': [
        {
            'formId': '12345',
            'username': 'mockusername',
            'name': {
                'firstName': 'Mock',
                'lastName': 'User'
            },
            'email': 'mockemail@mockemail.com',
            'phone': '3108675309',
            'address': {
                'streetNumber': '123',
                'streetName': 'Main Street',
                'city': 'Anytown',
                'state': 'CA',
                'zipcode': '91602',
            },
            'leaseRemainder': {
                'count': '7',
                'daysOrMonths': 'Days',
            },
            'placeComments': 'Comments on place here',
            'otherComments': 'Other comments here'
        },
        {
            'formId': '23456',
            'username': 'mockusername2',
            'name': {
                'firstName': 'Mock2',
                'lastName': 'User2'
            },
            'email': 'mockemail2@mockemail.com',
            'phone': '6198675309',
            'address': {
                'streetNumber': '1234',
                'streetName': 'Main Street',
                'city': 'Anytown',
                'state': 'CA',
                'zipcode': '91602',
            },
            'leaseRemainder': {
                'count': '30',
                'daysOrMonths': 'Months',
            },
            'placeComments': 'Comments on place here',
            'otherComments': 'Other comments here'
        }
    ]
};

const MOCK_FORM_DATA_USER = {
    'form': {
        'name': {
            'firstName': 'Mock',
            'lastName': 'User'
        },
        'email': 'mockemail@mockemail.com',
        'phone': '3108675309',
        'address': {
            'streetNumber': '123',
            'streetName': 'Main Street',
            'city': 'Anytown',
            'state': 'CA',
            'zipcode': '91602',
        },
        'leaseRemainder': {
            'count': '7',
            'daysOrMonths': 'Days',
        },
        'placeComments': 'Comments on place here',
        'otherComments': 'Other comments here'
    },
};