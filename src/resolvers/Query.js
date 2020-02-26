const Query = {
	comments(parent, args, { db }, info) {
		if (!args.query) {
			return db.comments
		}
		return db.comments.filter(comment =>
			comment.text.toLowerCase().includes(args.query.toLowerCase())
		)
	},
	posts(parent, args, { db }, info) {
		if (!args.query) {
			return db.posts
		}
		return db.posts.filter(post => {
			if (
				post.title.toLowerCase().includes(args.query.toLowerCase()) ||
				post.body.toLowerCase().includes(args.query.toLowerCase())
			) {
				return post
			}
		})
	},
	users(parent, args, { db }, info) {
		if (!args.query) {
			return db.users
		}
		return db.users.filter(user =>
			user.name.toLowerCase().includes(args.query.toLowerCase())
		)
	},
	me() {
		return {
			id: '123asd',
			name: 'Mike',
			email: 'mike@ddd',
			age: 66
		}
	},
	post() {
		return {
			id: '1345fd',
			title: 'Post',
			body: 'post body',
			published: true
		}
	}
}

export default Query
