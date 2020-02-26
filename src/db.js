const comments = [
	{
		id: 'co1',
		text: 'this is a comment',
		author: '3',
		post: '1'
	},
	{
		id: 'co2',
		text: 'CSS is hard',
		author: '1',
		post: '3'
	},
	{
		id: 'co3',
		text: 'JS rules',
		author: '2',
		post: '2'
	},
	{
		id: 'co4',
		text: 'PHP...',
		author: '3',
		post: '1'
	}
]

const posts = [
	{
		id: '1',
		title: 'This is post',
		body: 'GraphQL Rules',
		published: true,
		author: '1'
	},
	{
		id: '2',
		title: 'REST API',
		body: 'Node REST API',
		published: false,
		author: '2'
	},
	{
		id: '3',
		title: 'GraphQL vs REST',
		body: 'GraphQL wins',
		published: true,
		author: '2'
	}
]

const users = [
	{
		id: '1',
		name: 'Timo',
		email: 'timo@gmail.com',
		age: 34
	},
	{
		id: '2',
		name: 'Sinikka',
		email: 'sinikka@gmail.com'
	},
	{
		id: '3',
		name: 'mike',
		email: 'mike@gmail.com'
	}
]

const db = {
	posts,
	users,
	comments
}

export { db as default }
