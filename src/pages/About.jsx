export default function About() {
  const skills = [
    "React", "JavaScript", "Tailwind CSS", "Express.js",
    "Node.js", "MongoDB", "Git & GitHub", "REST APIs"
  ]

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 ">
      <h1 className="text-4xl font-bold text-black mb-2">About Me</h1>
      <div className="w-16 h-1 bg-blue-600 mb-8"></div>

      <p className="text-gray-600 leading-relaxed mb-6">
        I'm a full-stack developer focused on building clean, functional, and
        user-friendly web applications. I enjoy working across the stack —
        from designing intuitive interfaces to building solid backend systems
        that power them.
      </p>

      <p className="text-gray-600 leading-relaxed mb-12">
        I'm currently sharpening my skills in the MERN stack (MongoDB, Express,
        React, Node.js), with a strong focus on writing clean code and creating
        smooth, well-structured user experiences.
      </p>

      <h2 className="text-2xl font-semibold text-black mb-6">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 border border-black rounded-lg text-sm font-medium text-black hover:bg-[#324580] hover:text-white hover:border-[#324580] transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}