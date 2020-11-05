<template>
<div>
    <div class="h-48" style="background-color: #4560EB">
        <Nav />
    </div>
    <div class="container mx-auto rounded-md flex flex-col shadow-2xl p-6 -m-16 z-20 bg-white">
        <div v-if="questionnaireState" class="flex flex-col mb-2 h-32">
            <div class="text-2xl font-bold text-center">{{ currentQuestionObj.title }}</div>
            <div class="flex flex-row">
                <div class="w-2/6 flex justify-center items-center">
                    <div class="leading-none text-center">{{ currentQuestionObj.A }}</div>
                </div>
                <div class="w-2/6 flex items-center flex-col mb-4">
                    <div class="mt-6 flex items-center flex-row">
                        <label class="questionnaire-radio h-8 w-8">
                            <input name="selectValue" type="radio" value="1" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="questionnaire-radio h-6 w-6">
                            <input name="selectValue" type="radio" value="2" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="questionnaire-radio h-5 w-5">
                            <input name="selectValue" type="radio" value="3" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="questionnaire-radio h-6 w-6">
                            <input name="selectValue" type="radio" value="4" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                        <label class="questionnaire-radio h-8 w-8">
                            <input name="selectValue" type="radio" value="5" v-model="selectValue">
                            <div class="checkmark"></div>
                        </label>
                    </div>
                </div>
                <div class="w-2/6 flex justify-center items-center">
                    <div class="leading-none text-center">{{ currentQuestionObj.B }}</div>
                </div>
            </div>
        </div>
        <button v-if="!isDisabled" class="btn btn--large btn--darky" @click="startQuestionnaire">Commencer</button>
        <div class="flex justify-end">
            <button v-if="isDisabled && !beforeLastQuestion" class="btn btn--small btn--secondary" @click="nextQuestion">Suivant</button>
            <button v-if="beforeLastQuestion" class="btn btn--small btn--darky">Terminer</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            questions: [{
                    "id": "5f9ea8c9df233730330f76f2",
                    "title": "A une fête, tu préfères",
                    "responses": {
                        "A": "Intéragir avec tous le monde, y compris des inconnus",
                        "B": "Intéragir avec quelqu'un que tu connais"
                    },
                    "group": 1
                },
                {
                    "id": "5f9eac23df233730330f7798",
                    "title": "Dans les fêtes, tu es plutôt",
                    "responses": {
                        "A": "Celui qui reste tard avec une énergie croissante",
                        "B": "Celui qui part tôt avec moins d'énergie"
                    },
                    "group": 1
                }
            ],
            arrOfIds: [],
            questionnaireState: false,
            disabled: false,
            currentQuestionId: "",
            currentQuestionObj: {
                id: null,
                title: null,
                A: null,
                B: null,
                group: null
            },
            selectValue: null,
            beforeLast: false,
            results: [{
                "id": null,
                "user_id": null,
                "questions": []
            }]
        }
    },

    methods: {
        async nextQuestion() {
            await this.pushCurrentQuestion();

            this.selectValue = null;
            await this.selectQuestion(this.randomizeNumber());
            await this.currentQuestion();
        },

        async pushCurrentQuestion() {
            const vm = this;

            this.results.forEach(function (elm) {
                let data = {
                    question_id: vm.currentQuestionObj.id,
                    response: vm.selectValue,
                    group: vm.currentQuestionObj.group
                }
                elm.questions.push(data);
            })
        },

        async startQuestionnaire() {
            // generate array of all questions
            this.questions.forEach((elm, index) => {
                this.arrOfIds.push(elm.id);
            })
            this.disabled = true;
            this.questionnaireState = true;

            await this.selectQuestion(this.randomizeNumber());
            await this.currentQuestion();
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
                if (elm.id === this.currentQuestionId) {
                    this.currentQuestionObj = {
                        id: elm.id,
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
            if (this.arrOfIds.length == 0 && this.questionnaireState == true) {
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
$radioActive: #5D9BFB;

.questionnaire-radio {
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
