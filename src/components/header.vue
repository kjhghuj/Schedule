<template>
    <div class="headerBox">
        <div id="headerLeft"></div>
        <div id="headerCenter">
            <slot></slot>
        </div>
        <div id="headerRigth">
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'headBar',
    // components: {},
    props: ['isSchedule'],
    data() {
        return{

        };
    },
    // computed(){},
    // created(){},
    // mounted(){},
    methods: {
        addSchedule() {
            alert('弹出新增框框');
        },
    },
    // watch:{}
};
</script>
<style scoped>
.headerBox{
    width: 100%;
    height: 4.3rem;
    line-height: 4.3rem;
    background-color: #ff8507;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color:white;
}
#headerLeft{
    width: 15%;
    height: 100%;
}
#headerCenter{
    font-size:20px;
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    user-select: none;
}
#headerRigth{
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.addBtn{
    width: 3.3rem;
    height: 3.3rem;
    border: 2px solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    font-size: 63px;
    line-height: 2.6rem;
    user-select: none;
}
</style>