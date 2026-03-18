import Aurora from "./Aurora/Aurora"
import { useState, useEffect } from "react"
import CountUp from "./CountUp/CountUp"

const PreLoader = () => {
  const [loading, setLoading] = useState(true)
  const [countDone, setCountDone] = useState(false)
  const [fadeText, setFadeText] = useState(false)
  const [fadeScreen, setFadeScreen] = useState(false)
  const [startCount, setStartCount] = useState(true)

  useEffect(() => {
    setStartCount(true)
  }, [])

  useEffect(() => {
    if (countDone) {
      // Fade teks sedikit setelah hitungan selesai
      const fadeTextTimer = setTimeout(() => setFadeText(true), 220)

      // Fade seluruh screen setelah teks mulai menghilang
      const fadeScreenTimer = setTimeout(() => setFadeScreen(true), 420)

      // Hapus preloader setelah fade selesai
      const hideTimer = setTimeout(() => setLoading(false), 680)

      return () => {
        clearTimeout(fadeTextTimer)
        clearTimeout(fadeScreenTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [countDone])

  return (
    loading && (
      <div
        className={`fixed inset-0 z-[10000] bg-black overflow-hidden transition-opacity duration-1000 ${
          fadeScreen ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0">
          <Aurora
            colorStops={["#577870", "#1F97A6", "#127B99"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div
            className={`text-white text-center transition-all duration-1000 ${
              fadeText ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-7xl font-bold">
                {startCount ? (
                  <CountUp
                    from={0}
                    to={100}
                    separator=""
                    direction="up"
                    duration={1}
                    startWhen={startCount}
                    onEnd={() => setCountDone(true)}
                  />
                ) : (
                  "0"
                )}
              </span>
              <span className="text-7xl font-bold">%</span>
            </div>
            <p className="mt-6 text-sm text-white/80 font-medium">Loading...</p>
          </div>
        </div>
      </div>
    )
  )
}

export default PreLoader

