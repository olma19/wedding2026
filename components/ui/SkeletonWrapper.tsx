'use client'

import { useState, useEffect } from 'react'

interface SkeletonWrapperProps {
  children: React.ReactNode
  /**
   * Minimum time in milliseconds to show the skeleton
   * Prevents flickering when content loads too quickly
   */
  minDisplayTime?: number
}

/**
 * Wrapper component that ensures skeletons are visible for a minimum duration
 * Prevents flickering when lazy-loaded content loads very quickly
 */
export default function SkeletonWrapper({ 
  children, 
  minDisplayTime = 300 
}: SkeletonWrapperProps) {
  const [show, setShow] = useState(true)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, minDisplayTime - elapsed)
    
    const timer = setTimeout(() => {
      setShow(false)
    }, remaining)

    return () => clearTimeout(timer)
  }, [startTime, minDisplayTime])

  if (!show) {
    return null
  }

  return <>{children}</>
}
