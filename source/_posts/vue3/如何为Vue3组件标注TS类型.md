---
layout: _drafts
title: 如何为Vue3组件标注TS类型
date: 2023-09-29 11:57:22
categories: vue3
tags: [vue3, vue, 前端]
---
要说今年最热门的前端技术，Vue3 和 TS 绝对榜上有名了。据了解，已经有很多公司在使用 Vue3 + TS + Vite 开发新项目了。那么我们也不能落后，今天就给大家分享一下如何在 Vue3 组件中结合 Composition-Api 使用 TS 类型。如果有不会或者不熟的小伙伴，一起学起来吧！
## 为 props 标注类型

使用 `<script setup>`
当使用 `<script setup>` 时，`defineProps()`宏函数支持从它的参数中推导类型：

```vue
<script setup lang="ts">
  const props = defineProps({
    foo: { type: String, required: true },
    bar: Number
  })

  props.foo // string
  props.bar // number | undefined
</script>
```

这被称为 运行时声明 ，因为传递给 defineProps() 的参数会作为运行时的 props 选项使用。
第二种方式，通过泛型参数来定义 props 的类型，这种方式更加直接：

```vue
<script setup lang="ts">
  const props = defineProps<{
    foo: string
    bar?: number
  }>()
</script>

// or
<script setup lang="ts">
  interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

这被称为 基于类型的声明 ，编译器会尽可能地尝试根据类型参数推导出等价的运行时选项。这种方式的不足之处在于，失去了定义 `props` 默认值的能力。为了解决这个问题，我们可以使用 withDefaults 编译器宏：

```vue
interface Props {
  msg?: string
    labels?: string[]
}

  const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
  })
```

上面代码会被编译为等价的运行时`props`的`default`选项。
非 `<script setup>`
如果没有使用 `<script setup>`，那么为了开启 props 的类型推导，必须使用`defineComponent()`。传入 `setup()` 的 `props`对象类型是从 props 选项中推导而来。

```vue
import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      message: String
    },
    setup(props) {
      props.message // <-- 类型：string
    }
  })
```

## 为 emits 标注类型
使用 `<script setup>` 
在`<script setup>`中，emit 函数的类型标注也可以使用 运行时声明 或者 基于类型的声明 ：

```vue
<script setup lang="ts">
  // 运行时
  const emit = defineEmits(['change', 'update'])

  // 基于类型
  const emit = defineEmits<{
    (e: 'change', id: number): void
      (e: 'update', value: string): void
  }>()
    </script>
```

我们可以看到，基于类型的声明 可以使我们对所触发事件的类型进行更细粒度的控制。
非 `<script setup>`
若没有使用`<script setup>`，`defineComponent()`也可以根据`emits`选项推导暴露在`setup`上下文中的`emit`函数的类型：

```vue
import { defineComponent } from 'vue'

  export default defineComponent({
    emits: ['change'],
    setup(props, { emit }) {
      emit('change') // <-- 类型检查 / 自动补全
    }
  })
```

## 为 ref() 标注类型

默认推导类型
ref 会根据初始化时的值自动推导其类型：

```vue
import { ref } from 'vue'

  // 推导出的类型：Ref<number>
  const year = ref(2020)

  // => TS Error: Type 'string' is not assignable to type 'number'.
  year.value = '2020'
```
通过接口指定类型
有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 Ref 这个接口：

```vue
import { ref } from 'vue'
  import type { Ref } from 'vue'

  const year: Ref<string | number> = ref('2020')

  year.value = 2020 // 成功！
```

通过泛型指定类型
或者，在调用 ref() 时传入一个泛型参数，来覆盖默认的推导行为：

```vue
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')
year.value = 2020 // 成功！

```
如果你指定了一个泛型参数但没有给出初始值，那么最后得到的就将是一个包含 undefined 的联合类型：

```vue
// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()

```
## 为 reactive() 标注类型

默认推导类型
reactive() 也会隐式地从它的参数中推导类型：

```vue
import { reactive } from 'vue'

  // 推导得到的类型：{ title: string }
  const book = reactive({ title: 'Vue 3 指引' })
```

通过接口指定类型
要显式地指定一个 reactive 变量的类型，我们可以使用接口：

```vue
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 指引' })
```

## 为 computed() 标注类型

默认推导类型
computed() 会自动从其计算函数的返回值上推导出类型：
```vue
import { ref, computed } from 'vue'

const count = ref(0)

// 推导得到的类型：ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

通过泛型指定类型
你还可以通过泛型参数显式指定类型：

```vue
const double = computed<number>(() => {
  // 若返回值不是 number 类型则会报错
})
```

## 为事件处理函数标注类型

在处理原生 DOM 事件时，应该给事件处理函数的参数正确地标注类型。让我们看一下这个例子：
```vue
<script setup lang="ts">
  function handleChange(event) {
    // `event` 隐式地标注为 `any` 类型
    console.log(event.target.value)
  }
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

没有类型标注时，这个 event 参数会隐式地标注为 any 类型。这也会在 tsconfig.json 中配置了 "strict": true 或 "noImplicitAny": true 时报出一个 TS 错误。因此，建议显式地为事件处理函数的参数标注类型。此外，你可能需要显式地强制转换 event 上的属性：

```
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## 为 provide / inject 标注类型

provide 和 inject 通常会在不同的组件中运行。要正确地为注入的值标记类型，Vue 提供了一个 InjectionKey 接口，它是一个继承自 Symbol 的泛型类型，可以用来在提供者和消费者之间同步注入值的类型：

```vue
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // 若提供的是非字符串值会导致错误

const foo = inject(key) // foo 的类型：string | undefined
```

建议将注入 key 的类型放在一个单独的文件中，这样它就可以被多个组件导入。
当使用字符串注入 key 时，注入值的类型是 unknown，需要通过泛型参数显式声明：

```vue
const foo = inject<string>('key') // 类型：string | undefined
```

注意注入的值仍然可以是 undefined，因为无法保证提供者一定会在运行时 provide 这个值。当提供了一个默认值后，这个 undefined 类型就可以被移除：

```vue
const foo = inject<string>('foo', 'bar') // 类型：string
```

如果你确定该值将始终被提供，则还可以强制转换该值：

```vue
const foo = inject('foo') as string
```

## 为 dom 模板引用标注类型

模板 ref 需要通过一个显式指定的泛型参数和一个初始值 null 来创建：

```vue
<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const el = ref<HTMLInputElement | null>(null)

  onMounted(() => {
    el.value?.focus()
  })
</script>

<template>
  <input ref="el" />
</template>
```

注意为了严格的类型安全，有必要在访问 el.value 时使用可选链或类型守卫。这是因为直到组件被挂载前，这个 ref 的值都是初始的 null，并且 v-if 将引用的元素卸载时也会被设置为 null。
## 为组件模板引用标注类型
有时，我们需要为一个子组件添加一个模板 ref，以便调用它公开的方法。比如，我们有一个 MyModal 子组件，它有一个打开模态框的方法：

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
  import { ref } from 'vue'

  const isContentShown = ref(false)
  const open = () => (isContentShown.value = true)

  defineExpose({
    open
  })
</script>

```
为了获取 MyModal 的类型，我们首先需要通过 typeof 得到其类型，再使用 TypeScript 内置的 InstanceType 工具类型来获取其实例类型：

```vue
<!-- App.vue -->
<script setup lang="ts">
  import MyModal from './MyModal.vue'

  const modal = ref<InstanceType<typeof MyModal> | null>(null)

  const openModal = () => {
    modal.value?.open()
  }
</script>
```

Ok，以上就是在 Vue3 组件中使用 TS 类型的基本方法，也是我最近的 Vue3 学习笔记。欢迎在评论区交流讨论，一起学习成长！
