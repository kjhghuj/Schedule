<template>
    <li >
        <div class="itemBox">
            <div v-show="false">{{msg}}</div>
            <div class="ShowChilds" @click="showChilds">{{ isOpen ? '-' : '+'}}</div>
            <div class="ScheduleText">
                {{model.content}}
            </div>
            <div class="Status" v-show="model.status == 'underway'" @click="model.status = 'complete'">
                <img src="@/assets/刷新.png" style="width:85%;height:85%;" alt="">
            </div>
            <div class="Status" v-show="model.status == 'complete'" @click="model.status = 'underway'">
                <img src="@/assets/勾.png" style="width:85%;height:85%;" alt="">
            </div>
            <div class="Status" v-show="model.status != 'complete' && model.status != 'underway'" >
            </div>
            <!-- <div class="Status" v-if="model.status == 'NotStarted'">未开始</div> -->
            <!-- {{ model.content }} -->
            <!-- <span v-if="isFolder">{{ isOpen ? '-' : '+'}}</span> -->
        </div>
        <!-- <ul v-if="isOpen && isFolder"> -->
        <ul ref="uldom" v-if="isOpen && isFolder">
            <Item v-for="(item, index) in model.child"
                :model="item"
                :key="index"
            />
            <li class="itemBox" @click="OpenBox(true)">
                <div class="ShowChilds" ></div>
                <div class="ScheduleText">
                    添加新日程
                </div>
                <div class="Status"></div>
            </li>
        </ul>
    </li>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    name: 'Items',
    components: {
       Item: () => import('@/components/item'),
    },
    props: ['model', 'contentMsg'],
    data() {
        return {
            msg: 1,
            isOpen: false,
        };
    },
    computed: {
        isFolder() { // 该数据是否有子项目
            const getChild = (this as any).model.children;
            return getChild && getChild.length;
        },
        ...mapState({
            isReadyAdd: 'isReadyAdd',
        }),
    },
    // created(){},
    // mounted(){
    // },
    methods: {
        showChilds(): void {
            // this.$emit('update:child', this.Data.child); // 当前列的值
            if ((this as any).isFolder) {// 如果有子菜单
                (this as any).isOpen = !(this as any).isOpen;
            } else {// 如果没有子菜单
                Vue.set((this as any).model, 'children', []);
                (this as any).model.children.push({
                            content: '新日程',
                            status: 'NotStarted',
                        });
                (this as any).open = true;
            }
        },
        // 添加新日程
        handleAddClick(): void {
            const obj = {
                content: (this as any).contentMsg,
                status: 'underway',
            };
            if ((this as any).model.hasOwnProperty('child')) {
                (this as any).model.child.push(obj);
                (this as any).msg++; // 触发试图更新
                // window.console.log((this as any).model.child);
            } else {
                const key = 'child';
                (this as any).model[key] = [obj];
                (this as any).msg++; // 触发试图更新
                // (this as any).model.child.push();
                // window.console.log((this as any).model.child);
            }
            (this as any).AddNewSchedule(false);
            (this as any).OpenBox(false);
        },
        ...mapActions({
            OpenBox: 'OpenBox', // 第一个OpenBox是定义的一个函数别名称，挂载在到this(vue)实例上，后面一个OpenBox才是actions里面函数方法名称
        }),
        ...mapActions({
            AddNewSchedule: 'AddNewSchedule', // 第一个OpenBox是定义的一个函数别名称，挂载在到this(vue)实例上，后面一个OpenBox才是actions里面函数方法名称
        }),
    },
    watch: {
        isReadyAdd(val: boolean) {
            if (val) {
                (this as any).handleAddClick();
            }
        },
    },
};
</script>
<style scoped>
.itemBox{
    width: calc(100% - 10px);
    height: 2.2rem;
    margin-left:5px;
    box-shadow:0 0 5px 3px #999;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
}
.ShowChilds{
    width: 2rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px 0 0 5px;
}
.ScheduleText{
    width: calc(100% - 4.4rem);
    height: 100%;
    line-height: 2.2rem;
    overflow: hidden;
    text-overflow:ellipsis;
}
.Status{
    width: 2.2rem;
    height: 100%;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
ul {
    width: calc(100% - 15px);
    padding-left: 1em;
}
li {
    width: 100%;
    margin-top:15px;
}
</style>