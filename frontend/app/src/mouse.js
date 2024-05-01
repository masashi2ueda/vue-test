// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 慣習として、コンポーザブル関数の名前は "use" で始めます
export function useMouse() {
  // コンポーザブルによってカプセル化および管理される状態
  const mouse_x = ref(0)
  const mouse_y = ref(0)

  // コンポーザブルは管理している状態を時間の経過とともに更新できます。
  function update(event) {
    mouse_x.value = event.pageX
    mouse_y.value = event.pageY
  }

  // コンポーザブルは所有コンポーネントのライフライクルにフックして
  // 副作用のセットアップや破棄することもできます。
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 管理された状態を戻り値として公開
  return { mouse_x, mouse_y }
}