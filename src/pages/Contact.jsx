import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {

	const [form, setForm] = useState({
		name: '',
		email: '',
		message: ''
	})
	const formRef = useRef(null)
	const [loading, setLoading] = useState(false)
	const [currentAnimation, setCurrentAnimation] = useState('idle')

	const handleChange = ({ target: { name, value }}) => {
		setForm({...form, [name]: value})
	}

	const handleFocus = () => setCurrentAnimation('walk')
	const handleBlur = () => setCurrentAnimation('idle')
	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		setCurrentAnimation('hit')

		emailjs.send(
			import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
			import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
{
				from_name: form.name,
				to_name: 'Leo',
				from_email: form.email,
				to_email: 'lappangcheung@gmail.com',
				message: form.message
			},
			import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
		).then(() => {
			setLoading(false)
			// TO DO SUCCESS MESSAGE
			// TO DO HIT ALERT
			setForm({
				name: '',
				email: '',
				message: ''
			})
		}).catch((err) => {
			console.error(err)
			// TO DO SHOW ERROR
		})
	}

	return (
		<section className="relative flex lg:flex-row flex-col max-container">
			<div className="flex-1 min-w-[50%] flex flex-col">
				<h1 className="head-text">
					Get in Touch
				</h1>
				<form className="w-full flex flex-col gap-7 mt-14"
				      onSubmit={handleSubmit}>
					<label className="text-black-500 font-semibold">
						Name
					</label>
					<input
						type="text"
						name="name"
						className="input"
						placeholder="John"
						required
						value={form.name}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<label className="text-black-500 font-semibold">
						Email
					</label>
					<input
						type="text"
						name="email"
						className="input"
						placeholder="john@gmail.com"
						required
						value={form.email}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<label className="text-black-500 font-semibold">
						Message
					</label>
					<textarea
						type="text"
						rows={4}
						name="message"
						className="input"
						placeholder="Let me know how I can help you!"
						required
						value={form.message}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<button
						type="submit"
						className="btn"
						disabled={loading}
						onFocus={handleFocus}
						onBlur={handleBlur}
					>
						{ loading ? 'Sending...' : 'Send Message'}
					</button>
				</form>
			</div>
		</section>
	)
}

export default Contact
