import uuidv4 from 'uuid/v4'

const Mutation = {
	createUser(parent, args, { db }, info) {
		const emailTaken = db.users.some(user => user.email === args.data.email)

		if (emailTaken) {
			throw new Error('Email taken.')
		}
		const user = {
			id: uuidv4(),
			...args.data
		}
		db.users.push(user)
		return user
	},
	deleteUser(parent, args, { db }, info) {
		const userIndex = db.users.findIndex(user => user.id === args.id)
		if (userIndex === -1) {
			throw new Error('User not found')
		}
		const deletedUsers = db.users.splice(userIndex, 1)

		db.posts = db.posts.filter(post => {
			const match = post.author === args.id

			if (match) {
				db.comments = db.comments.filter(comment => comment.post !== post.id)
			}
			return !match
		})
		db.comments = db.comments.filter(comment => comment.author !== args.id)
		return deletedUsers[0]
	},
	updateUser(parent, { id, user }, { db }, info) {
		const foundedUser = db.users.find(user => user.id === id)

		if (!foundedUser) {
			throw new Error('User not found')
		}
		if (typeof user.email === 'string') {
			const emailTaken = db.users.some(u => u.email === user.email)
			if (emailTaken) {
				throw new Error('Email taken')
			}
			foundedUser.email = user.email
		}
		if (typeof user.name === 'string') {
			foundedUser.name = user.name
		}

		if (typeof user.age !== 'undefined') {
			foundedUser.age = user.age
		}

		return foundedUser
	},
	createPost(parent, args, { db }, info) {
		const userExists = db.users.some(user => user.id === args.post.author)
		if (!userExists) {
			throw new Error('User not found!')
		}
		const post = {
			id: uuidv4(),
			...args.post
		}

		db.posts.push(post)
		return post
	},
	deletePost(parent, args, { db }, info) {
		const postIndex = db.posts.findIndex(post => post.id === args.id)
		if (postIndex === -1) {
			throw new Error('Post not found!')
		}
		const deletedPost = db.posts.splice(postIndex, 1)
		db.comments = [...db.comments].filter(comment => comment.post !== args.id)

		return deletedPost[0]
	},
	updatePost(parent, { id, data }, { db }, info) {
		const post = db.posts.find(p => p.id === id)

		if (!post) {
			throw new Error('Post not found')
		}

		if (typeof data.title === 'string') {
			post.title = data.title
		}
		if (typeof data.body === 'string') {
			post.body = data.body
		}
		if (typeof data.published === 'boolean') {
			post.published = data.published
		}

		return post
	},
	createComment(parent, args, { db }, info) {
		const userExists = db.users.some(user => user.id === args.comment.author)
		if (!userExists) {
			throw new Error('User not found!')
		}
		const postExists = db.posts.some(
			post => post.id === args.comment.post && post.published === true
		)
		if (!postExists) {
			throw new Error('Post not found!')
		}

		// const comment = { ...args, id: uuidv4() }
		const comment = {
			id: uuidv4(),
			...args.comment
		}
		db.comments.push(comment)
		return comment
	},
	deleteComment(parent, args, { db }, info) {
		const commentIndex = db.comments.findIndex(c => c.id === args.id)
		if (commentIndex === -1) {
			throw new Error('Comment not found')
		}
		const deletedComment = db.comments.splice(commentIndex, 1)

		return deletedComment[0]
	},
	updateComment(parent, { id, data }, { db }, info) {
		const comment = db.comments.find(c => c.id === id)
		if (!comment) {
			throw new Error('Comment not found')
		}
		if (typeof data.text === 'string') {
			comment.text = data.text
		}
		return comment
	}
}
export default Mutation
