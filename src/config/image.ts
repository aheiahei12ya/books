export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `http://aheiahei.imdo.co:8081//repository/blob/${params.join(',')}${src}`
  // return `http://aheiahei.imdo.co:8081//repository/blob/${src}`
}
