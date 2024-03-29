<template>
<div>
    <HeaderPage header-title="Test de personnalité gratuit" />

    <div class="container mx-auto rounded-md flex flex-col shadow-2xl p-8 -m-16 z-20 bg-white">
        <ProgressBar v-if="isDisabled" :percentage="contentProgress" :color="'primary'" class="mb-8 h-4"></ProgressBar>
        <div v-if="loading" id="loading" class="h-20 w-20 m-auto"></div>
        <div v-if="testState" class="flex flex-col">
            <div class="text-2xl font-bold text-center leading-none">{{ currentQuestionObj.title }}</div>
            <div class="flex flex-wrap my-8 lg:my-6">
                <div class="w-full md:w-full lg:w-2/6 xl:w-2/6 flex justify-center items-center">
                    <div class="leading-none text-center">{{ currentQuestionObj.A }}</div>
                </div>
                <div class="w-full md:w-full lg:w-2/6 xl:w-2/6 flex items-center flex-col mb-4">
                    <div class="mt-6 flex items-center flex-col lg:flex-row">
                        <label class="test-radio h-10 w-10">
                            <input name="selectValue" type="radio" value="0" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="test-radio h-8 w-8">
                            <input name="selectValue" type="radio" value="1" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="test-radio h-6 w-6">
                            <input name="selectValue" type="radio" value="2" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="test-radio h-6 w-6">
                            <input name="selectValue" type="radio" value="3" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="test-radio h-8 w-8">
                            <input name="selectValue" type="radio" value="4" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="test-radio h-10 w-10">
                            <input name="selectValue" type="radio" value="5" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                    </div>
                </div>
                <div class="w-full md:w-full lg:w-2/6 xl:w-2/6 flex justify-center items-center">
                    <div class="leading-none text-center">{{ currentQuestionObj.B }}</div>
                </div>
            </div>
            <div class="flex justify-end">
                <button v-if="isDisabled && !beforeLastQuestion && !loading" :disabled="isActive" class="btn btn--small btn--secondary" @click="nextQuestion">Suivant
                    <fa :icon="['fa', 'angle-right']" class="ml-1 text-base" />
                </button>
                <button v-if="beforeLastQuestion" @click="lastQuestion" :disabled="isActive" class="btn btn--small btn--darky">Terminer</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    layout: 'default',

    data() {
        return {
            pageTitle: 'Test de personnalité gratuit',
            loading: false,
            arrOfIds: [],
            testState: false,
            disabled: false,
            currentQuestionId: "",
            currentQuestionObj: {
                _id: null,
                title: null,
                A: null,
                B: null,
                group: null
            },
            selectValue: null,
            beforeLast: false,
            percentageStart: 0,
            stepProgress: 0,
            contentProgress: 0,
            active: true,
        }
    },

    methods: {
        async getQuestions() {
            // get all questions of database
            try {
                this.disabled = false;

                await this.$store.dispatch('test/getAllQuestions');
                // push all ids questions
                this.getAllQuestions.forEach((elm, index) => {
                    this.arrOfIds.push(elm._id);
                });

                // setup a progress step
                this.stepProgress = 100 / this.arrOfIds.length;

                // create empty test
                await this.$store.dispatch('test/createTest');
                return 'success'
            } catch (e) {
                this.$router.push({
                    path: '/'
                })
            }
        },

        async nextQuestion() {
            const pushQuestion = await this.pushCurrentQuestion();

            if (pushQuestion == 'success') {
                await this.selectQuestion(this.randomizeNumber());
                await this.currentQuestion();

                this.testState = true;
                this.disabled = true;
                this.loading = false;
            } else {
                this.$router.push({
                    path: '/'
                })
            }

            this.selectValue = null;
        },

        async lastQuestion() {
            const pushQuestion = await this.pushCurrentQuestion();

            if (pushQuestion == 'success') {
                this.$router.push({
                    path: '/test/result'
                })
            }
        },

        async pushCurrentQuestion() {
            this.loading = true;
            this.disabled = true;
            this.testState = false;
            try {
                await this.$store.dispatch('test/pushQuestion', {
                    question_id: this.currentQuestionObj._id,
                    response: this.selectValue,
                    group: this.currentQuestionObj.group
                });
                return 'success'
            } catch (e) {
                this.$router.push({
                    path: '/'
                })
            }
        },

        async startTest() {
            this.loading = true;
            this.disabled = true;

            const fetchQuestions = await this.getQuestions();

            if (fetchQuestions == 'success') {
                this.loading = false;
                this.disabled = true;
                this.testState = true;

                await this.selectQuestion(this.randomizeNumber());
                await this.currentQuestion();
            } else {
                this.$router.push({
                    path: '/'
                })
            }
        },

        randomizeNumber() {
            // randomize id in array
            const random = Math.floor(Math.random() * this.arrOfIds.length);
            return random, this.arrOfIds[random]
        },

        async selectQuestion(elm) {
            const index = this.arrOfIds.indexOf(elm);
            this.currentQuestionId = elm;
            if (index > -1) {
                this.arrOfIds.splice(index, 1);
            }
        },

        async currentQuestion() {
            this.getAllQuestions.forEach((elm, index) => {
                if (elm._id === this.currentQuestionId) {
                    this.currentQuestionObj = {
                        _id: elm._id,
                        title: elm.title,
                        A: elm.responses.A,
                        B: elm.responses.B,
                        group: elm.group
                    }
                }
            });

            // add to progress bar
            this.contentProgress += this.stepProgress;
        }
    },
    computed: {
        isDisabled: function () {
            return this.disabled;
        },
        isActive: function () {
            return this.active;
        },
        beforeLastQuestion: function () {
            return this.arrOfIds.length == 0 && this.testState == true ? this.beforeLast = true : ''
        },
        ...mapGetters({
            getTestId: 'test/getTestId',
            getAllQuestions: 'test/getAllQuestions',
        }),

    },

    watch: {
        selectValue: function () {
            this.selectValue === null ? this.active = true : this.active = false
        }
    },

    async mounted() {
        await this.startTest()
    }
}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";

$radioSize: 22px;
$radioBorder: #D1D7E3;
$radioActive: $secondary-color;

.test-radio {
    margin: 16px 16px;
    display: block;
    cursor: pointer;
    position: relative;

    input {
        display: none;
        top: 0;
        left: 0;

        &:checked {
            ~.checkmark {
                &:before {
                    transform: scale(1.04);
                    background: $radioActive;
                }

                &:after {
                    transform: scale(.4);
                    transition: transform .3s ease;
                }
            }
        }
    }

    .checkmark {
        height: 100%;
        width: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;

        &:not(:empty) {
            padding-left: 100% + 8;
        }

        &:before,
        &:after {
            content: '';
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 50%;
            left: 0;
            top: 0;
            position: absolute;
        }

        &:before {
            background: $radioBorder;
            transition: background .2s ease, transform .4s cubic-bezier(.175, .885, .32, 2);
        }

        &:after {
            background: #fff;
            transform: scale(.78);
            transition: transform .6s cubic-bezier(.175, .885, .32, 1.4);
        }

        &:hover {

            &:before {
                transform: scale(.92);
            }

            &:after {
                transform: scale(.74);
            }

        }
    }

}
</style>
