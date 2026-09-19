import { useParams, Link } from 'react-router-dom'
import projects from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === Number(id))

  if (!project) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Project Not Found</h1>
        <Link to="/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/projects" className="text-blue-600 text-sm font-medium hover:underline">
        ← Back to Projects
      </Link>

      <div className="h-72 bg-gray-100 rounded-xl mt-6 mb-8 flex items-center justify-center text-gray-400">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-xl" />
        ) : (
          "Project Image"
        )}
      </div>

      <h1 className="text-4xl font-bold text-black mb-2">{project.title}</h1>
      <div className="w-16 h-1 bg-blue-600 mb-6"></div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((t) => (
          <span key={t} className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded">
            {t}
          </span>
        ))}
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">{project.fullDescription}</p>

      {project.features?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-black mb-4">Key Features</h2>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600">
                <span className="text-blue-600 mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        
          <a href={project.liveLink}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Live Demo
        </a>
        
          <a href={project.githubLink}
          className="px-6 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition text-sm font-medium"
        >
          View on GitHub
        </a>
      </div>
    </section>
  )
}