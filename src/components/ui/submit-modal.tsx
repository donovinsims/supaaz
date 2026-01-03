"use client"

import * as React from "react"
import { X, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface SubmitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SubmitModal({ open, onOpenChange }: SubmitModalProps) {
  const [resourceLink, setResourceLink] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [subscribe, setSubscribe] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resourceLink || !email) return

    setStatus('loading')
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setResourceLink("")
      setEmail("")
      setSubscribe(false)
    } catch {
      setStatus('error')
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setStatus('idle')
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        showCloseButton={false}
        className="max-w-[500px] p-8 rounded-[24px] bg-ui-1 border border-border-1"
      >
        {status === 'success' ? (
          <div className="text-center py-8">
            <p className="text-[16px] text-text-primary">Thanks for your submission</p>
          </div>
        ) : status === 'error' ? (
          <div className="text-center py-8">
            <p className="text-[16px] text-red-500">Something went wrong, please try again</p>
          </div>
        ) : (
          <>
            <DialogHeader className="gap-0 pb-2">
              <div className="flex items-start justify-between">
                <DialogTitle className="text-[28px] font-bold text-text-primary leading-tight">
                  Submit a resource
                </DialogTitle>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-ui-3 hover:bg-ui-4 transition-colors"
                >
                  <X className="w-4 h-4 text-text-primary" />
                </button>
              </div>
              <DialogDescription className="text-[16px] text-text-secondary leading-relaxed mt-3 max-w-[360px]">
                Submit a resource for other freelancers. If we like it too, we&apos;ll feature it on Freelance Things.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">
              <input
                type="url"
                placeholder="Resource link"
                value={resourceLink}
                onChange={(e) => setResourceLink(e.target.value)}
                required
                className="w-full px-5 py-4 text-[16px] text-text-primary placeholder-text-secondary bg-ui-2 rounded-[12px] outline-none border border-border-1 focus:border-border-4 transition-colors"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 text-[16px] text-text-primary placeholder-text-secondary bg-ui-2 rounded-[12px] outline-none border border-border-1 focus:border-border-4 transition-colors"
              />
              
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={subscribe}
                  onCheckedChange={(checked) => setSubscribe(checked === true)}
                  className="w-5 h-5 rounded-[4px] border-2 border-text-primary data-[state=checked]:bg-text-primary data-[state=checked]:border-text-primary"
                />
                <span className="text-[14px] text-text-primary">Subscribe to the weekly email</span>
              </label>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="text-text-primary bg-ui-1 border border-border-1 px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all hover:bg-ui-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                {status === 'loading' ? 'Submitting...' : (
                  <>
                    Submit
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
