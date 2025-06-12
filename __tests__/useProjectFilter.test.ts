import { renderHook, act } from '@testing-library/react-hooks'
import { useProjectFilter } from '@/hooks/useProjectFilter'

jest.mock('@/data/resume', () => ({
  DATA: {
    projects: [
      {
        title: 'Project A',
        description: '',
        dates: '',
        technologies: ['React', 'Tailwind'],
        active: true,
      },
      {
        title: 'Project B',
        description: '',
        dates: '',
        technologies: ['Python', 'Data'],
        active: true,
      },
    ],
  },
}))

describe('useProjectFilter', () => {
  it('returns all projects by default', () => {
    const { result } = renderHook(() => useProjectFilter())
    expect(result.current.activeFilter).toBe('all')
    expect(result.current.filteredProjects).toHaveLength(2)
  })

  it('filters projects by technology', () => {
    const { result } = renderHook(() => useProjectFilter())
    act(() => {
      result.current.setActiveFilter('python')
    })
    expect(result.current.filteredProjects).toHaveLength(1)
    expect(result.current.filteredProjects[0].title).toBe('Project B')
  })

  it('includes \"all\" as first category', () => {
    const { result } = renderHook(() => useProjectFilter())
    expect(result.current.categories[0]).toBe('all')
  })
})
