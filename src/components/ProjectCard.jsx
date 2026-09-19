import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-600 transition flex flex-col">
      <div className="h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          "Project Image"
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-lg font-semibold text-black mb-2 hover:text-blue-600 transition">
            {project.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4 text-sm font-medium">
          <Link to={`/projects/${project.id}`} className="text-blue-600 hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}