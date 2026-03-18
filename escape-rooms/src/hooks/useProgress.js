import { useState, useEffect } from 'react'

export function useProgress(roomId) {
  const key = `enigma_progress_${roomId}`
  
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : { solved: [], hints: {}, startTime: Date.now() }
    } catch {
      return { solved: [], hints: {}, startTime: Date.now() }
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(progress))
  }, [progress, key])

  const solvePuzzle = (puzzleId) => {
    setProgress(p => ({ ...p, solved: [...new Set([...p.solved, puzzleId])] }))
  }

  const useHint = (puzzleId, hintNum) => {
    setProgress(p => ({
      ...p,
      hints: { ...p.hints, [`${puzzleId}_${hintNum}`]: true }
    }))
  }

  const isHintUsed = (puzzleId, hintNum) => !!progress.hints[`${puzzleId}_${hintNum}`]
  const isSolved = (puzzleId) => progress.solved.includes(puzzleId)
  const resetRoom = () => {
    const fresh = { solved: [], hints: {}, startTime: Date.now() }
    setProgress(fresh)
    localStorage.setItem(key, JSON.stringify(fresh))
  }

  const getElapsedMinutes = () => Math.floor((Date.now() - progress.startTime) / 60000)

  return { progress, solvePuzzle, useHint, isHintUsed, isSolved, resetRoom, getElapsedMinutes }
}
