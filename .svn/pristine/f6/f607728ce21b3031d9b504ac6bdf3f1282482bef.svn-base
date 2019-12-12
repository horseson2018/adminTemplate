<template>
  <div v-if="!item.hidden" :key="resolvePath(item.path)">
    <el-submenu
      v-if="item.children"
      :index="resolvePath(item.path)"
    >
      <template slot="title">
        <IconSvg :el="item.meta.el" :icon="item.meta.icon" />
        <span slot="title">{{ item.meta.title }}</span>
      </template>

      <template v-for="child in item.children">
        <ItemBar
          v-if="child.children && child.children.length > 0"
          :item="child"
          :key="resolvePath(child.path)"
          :base-path="resolvePath(child.path)"
        />
        <Linker v-else :url="resolvePath(child.path)" :key="resolvePath(child.path)">
          <el-menu-item :index="resolvePath(child.path)">
            <IconSvg :el="child.meta.el" :icon="child.meta.icon" />
            <span slot="title">{{ child.meta.title }}</span>
          </el-menu-item>
        </Linker>
      </template>

    </el-submenu>
    <Linker v-else :url="resolvePath(item.path)" :key="resolvePath(item.path)">
      <el-menu-item :index="resolvePath(item.path)">
        <IconSvg :el="item.meta.el" :icon="item.meta.icon" />
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </Linker>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import IconSvg from './icon'
import Linker from './link'

export default {
  name: 'ItemBar',
  components: {
    IconSvg,
    Linker
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
