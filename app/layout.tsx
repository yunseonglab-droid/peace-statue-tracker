import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'평화의 발걸음 | 전국 소녀상 답사 지도',description:'전국 79곳 평화의 소녀상 위치와 현장 안내, 답사 동선, 방문 기록.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
