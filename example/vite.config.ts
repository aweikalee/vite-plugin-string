import { UserConfig } from 'vite'
import vitePluginString from '../src/index'

export default <UserConfig>{
    plugins: [vitePluginString()],
}
