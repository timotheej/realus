<template>
<div>
    <div class="h-56" style="background-color: #4560EB">
        <Nav />
        <div class="container mx-auto pt-24 pl-4">
            <h2 class="text-white font-medium">Test de personnalité gratuit</h2>
        </div>
    </div>
    <div class="container mx-auto rounded-md flex flex-col shadow-2xl p-6 -m-16 z-20 bg-white">
        <div v-if="loading" id="loading" class="h-20 w-20 m-auto"></div>
        <transition name="fade">
            <div v-if="testState" class="flex flex-col mb-2">
                <div class="text-2xl font-bold text-center">{{ currentQuestionObj.title }}</div>
                <div class="flex flex-row">
                    <div class="w-2/6 flex justify-center items-center">
                        <div class="leading-none text-center">{{ currentQuestionObj.A }}</div>
                    </div>
                    <div class="w-2/6 flex items-center flex-col mb-4">
                        <div class="mt-6 flex items-center flex-row">
                            <label class="test-radio h-8 w-8">
                                <input name="selectValue" type="radio" value="1" v-model="selectValue">
                                <div class="checkmark"></div>
                            </label>
                            <label class="test-radio h-6 w-6">
                                <input name="selectValue" type="radio" value="2" v-model="selectValue">
                                <div class="checkmark"></div>
                            </label>
                            <label class="test-radio h-5 w-5">
                                <input name="selectValue" type="radio" value="3" v-model="selectValue">
                                <div class="checkmark"></div>
                            </label>
                            <label class="test-radio h-6 w-6">
                                <input name="selectValue" type="radio" value="4" v-model="selectValue">
                                <div class="checkmark"></div>
                            </label>
                            <label class="test-radio h-8 w-8">
                                <input name="selectValue" type="radio" value="5" v-model="selectValue">
                                <div class="checkmark"></div>
                            </label>
                        </div>
                    </div>
                    <div class="w-2/6 flex justify-center items-center">
                        <div class="leading-none text-center">{{ currentQuestionObj.B }}</div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button v-if="isDisabled && !beforeLastQuestion && !loading" class="btn btn--small btn--secondary" @click="nextQuestion">Suivant</button>
                    <button v-if="beforeLastQuestion" class="btn btn--small btn--darky">Terminer</button>
                </div>
            </div>
        </transition>
        <div class="flex justify-center" v-if="!isDisabled">
            <button class="btn btn--large btn--darky" @click="startTest">Commencer le test</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            questions: [],
            arrOfIds: [],
            testState: false,
            disabled: false,
            currentTestId: "",
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
        }
    },

    methods: {
        async getQuestions() {
            // get all questions of database
            try {
                const result = await this.$axios.$get('http://localhost:3100/q');
                this.questions = result;
                // push all ids questions
                this.questions.forEach((elm, index) => {
                    this.arrOfIds.push(elm._id);
                });
                // create empty test
                const create = await this.$axios.$post('http://localhost:3100/t/createTest');
                this.currentTestId = create._id;
                return 'success'
            } catch (e) {
                this.loading = false;
                this.disabled = false;
                this.testState = false;
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
                this.disabled = false;
                this.testState = false;
            }
            this.selectValue = null;
        },

        async pushCurrentQuestion() {
            this.loading = true;
            this.disabled = true;
            this.testState = false;

            try {
                const pushQuestion = await this.$axios.$put('http://localhost:3100/t/pushResponse/' + this.currentTestId, {
                    question_id: this.currentQuestionObj._id,
                    response: this.selectValue,
                    group: this.currentQuestionObj.group
                });
                return 'success'
            } catch (e) {
                this.loading = false;
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
                this.disabled = false;
                this.testState = false;
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
            this.questions.forEach((elm, index) => {
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
        }
    },
    computed: {
        isDisabled: function () {
            return this.disabled;
        },
        beforeLastQuestion: function () {
            if (this.arrOfIds.length == 0 && this.testState == true) {
                return this.beforeLast = true;
            }
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";

$radioSize: 22px;
$radioBorder: #D1D7E3;
$radioActive: $secondary-color;

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}

.test-radio {
    margin: 16px 16px;
    display: block;
    cursor: pointer;
    position: relative;
    /*     height: $radioSize;
    width: $radioSize; */

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
