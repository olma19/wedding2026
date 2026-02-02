import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/utils/render'
import Card from './Card'
import CardHeader from './CardHeader'
import CardContent from './CardContent'
import CardFooter from './CardFooter'

describe('Card Components', () => {
  describe('Card', () => {
    it('should render children', () => {
      render(
        <Card>
          <p>Card content</p>
        </Card>
      )

      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('should apply default variant styles', () => {
      const { container } = render(
        <Card>
          <p>Content</p>
        </Card>
      )

      const card = container.firstChild
      expect(card).toHaveClass('rounded-lg', 'overflow-hidden')
    })

    it('should apply hover effect when hover prop is true', () => {
      const { container } = render(
        <Card hover>
          <p>Content</p>
        </Card>
      )

      const card = container.firstChild
      expect(card).toHaveClass('transition-all', 'duration-300')
    })

    it('should accept custom className', () => {
      const { container } = render(
        <Card className="custom-class">
          <p>Content</p>
        </Card>
      )

      const card = container.firstChild
      expect(card).toHaveClass('custom-class')
    })
  })

  describe('CardHeader', () => {
    it('should render children', () => {
      render(
        <Card>
          <CardHeader>
            <h2>Header</h2>
          </CardHeader>
        </Card>
      )

      expect(screen.getByText('Header')).toBeInTheDocument()
    })

    it('should add divider when divider prop is true', () => {
      render(
        <Card>
          <CardHeader divider>
            <h2>Header</h2>
          </CardHeader>
        </Card>
      )

      const header = screen.getByText('Header').parentElement
      expect(header).toHaveClass('border-b')
    })
  })

  describe('CardContent', () => {
    it('should render children', () => {
      render(
        <Card>
          <CardContent>
            <p>Content</p>
          </CardContent>
        </Card>
      )

      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  describe('CardFooter', () => {
    it('should render children', () => {
      render(
        <Card>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Action')).toBeInTheDocument()
    })

    it('should add divider when divider prop is true', () => {
      render(
        <Card>
          <CardFooter divider>
            <button>Action</button>
          </CardFooter>
        </Card>
      )

      const footer = screen.getByText('Action').parentElement
      expect(footer).toHaveClass('border-t')
    })
  })

  describe('Card Composition', () => {
    it('should compose CardHeader, CardContent, and CardFooter', () => {
      render(
        <Card>
          <CardHeader>
            <h2>Title</h2>
          </CardHeader>
          <CardContent>
            <p>Body content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Body content')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })
})
