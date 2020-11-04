<template>
<div>
    <div class="h-48" style="background-color: #4560EB">
        <Nav />
    </div>
    <div class="container mx-auto rounded-md flex flex-col shadow-2xl p-6 -m-16 z-20 bg-white">
        <div v-if="questionnaireState" class="flex mb-2 h-32">
            <div class="w-2/6 flex justify-center items-center">
                <div class="leading-none text-center">{{ currentQuestionObj.A }}</div>
            </div>
            <div class="w-4/6 flex items-center flex-col mb-4">
                <div class="text-2xl font-bold">{{ currentQuestionObj.title }}</div>
                <div></div>
            </div>
            <div class="w-2/6 flex justify-center items-center">
                <div class="leading-none text-center">{{ currentQuestionObj.B }}</div>
            </div>
        </div>
        <button v-if="!isDisabled" class="btn btn--large btn--darky" @click="startQuestionnaire">Commencer</button>
        <div class="flex justify-end">
            <button v-if="isDisabled" class="btn btn--small btn--secondary" @click="nextQuestion">Suivant</button>
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
            }
        }
    },

    methods: {
        async startQuestionnaire() {
            //generate new array of all questions
            this.questions.forEach((elm, index) => {
                this.arrOfIds.push(elm.id);
            })

            console.log('length arr ' + this.arrOfIds.length)

            this.disabled = true;
            this.questionnaireState = true;
            await this.selectQuestion(this.randomizeNumber());
            await this.currentQuestion();

            console.log('length arr ' + this.arrOfIds.length)
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

        async nextQuestion() {
            await this.selectQuestion(this.randomizeNumber());
            await this.currentQuestion();

            console.log('length arr ' + this.arrOfIds.length)

            console.log('arrOfIds 2 ' + this.arrOfIds)
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

            console.log('this current Q ' + JSON.stringify(this.currentQuestionObj))
        }
    },
    computed: {
        isDisabled: function () {
            return this.disabled;
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";
</style>
