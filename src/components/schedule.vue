<template>
    <div style="width:100%;height:100%;">
        <HeadBar :isSchedule='true'>日程</HeadBar>
        <div class="ScheduleContent">
            <ul>
                <Item :model="ScheduleData" :contentMsg.sync='contentMsg'></Item>
            </ul>
        </div>
        <div class="shadowBox" v-show="isOpenAddBox">
            <div class="InputBox">
                <p>新建日程</p>
                <input type="text" v-model="contentMsg" placeholder="请输入">
                <button @click="submit">确定</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import HeadBar from '@/components/header.vue';
import Item from '@/components/item.vue';
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
export default {
    name: 'schedule',
    components: {
        HeadBar,
        Item,
    },
    data() {
        return{
            ScheduleData: {
                content: '我的日程',
                child: [
                    {
                        content: '买菜',
                        status: 'underway',
                        child: [
                            {
                                content: '买肉',
                                status: 'complete',
                            },
                            {
                                content: '买西红柿',
                                status: 'complete',
                            },
                            {
                                content: '买黄瓜',
                                status: 'underway',
                            },
                        ],
                    },
                    {
                        content: '买二手电动车',
                        status: 'underway',
                    },
                ],
            },
            contentMsg: '',
        };
    },
    computed: {
        ...mapState({
            isOpenAddBox: 'isOpenAddBox',
        }),
    },
    // created(){},
    // mounted() {
    // },
    methods: {
        submit() {
            // window.console.log('submit');
            (this as any).AddNewSchedule(true);
        },
        cancel() {
            (this as any).contentMsg = '';
            // window.console.log('cancel');
            (this as any).OpenBox(false);
        },
        ...mapActions({
            OpenBox: 'OpenBox', // 第一个OpenBox是定义的一个函数别名称，挂载在到this(vue)实例上，后面一个OpenBox才是actions里面函数方法名称
        }),
        ...mapActions({
            AddNewSchedule: 'AddNewSchedule',
        }),
    },
    // watch: {
    // },
};
</script>
<style scoped>
.ScheduleContent{
    width: 100%;
    height: calc(100% - 4.3rem);
}
.shadowBox{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    /* opacity: 0.4; */
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.InputBox{
    width: 80%;
    height: 10.5rem;
    background: #FFF;
    border-radius: 5px;
    box-shadow:0 0 5px 3px #999;
}
.InputBox p{
    padding-left: 15px;
    margin-top: 10px;
    font-family: 微软雅黑;
    font-size: 20px;
    margin-bottom: 5px;
}
.InputBox input{
    display: block;
    width: 80%;
    border: 1px solid #ff8507;
    height: 2.5rem;
    margin-left: 15px;
    margin-top: 10px;
    text-indent: 15px;
    border-radius: 5px;
}
.InputBox button{
    margin-left: 15px;
    margin-top: 15px;
    width: 22%;
    height: 2.6rem;
    border-radius: 5px;
    border: none;
    color: #fff;
    background: #ff8507;
}
.InputBox button:last-child{
    margin-left: 15px;
    margin-top: 15px;
    width: 22%;
    height: 2.6rem;
    border-radius: 5px;
    border: 1px solid #ff8507;
    color: #000;
    background: #fff;
}
</style>