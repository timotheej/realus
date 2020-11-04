<template>
<div>
    <div class="h-48" style="background-color: #4560EB">
        <Nav />
    </div>
    <div class="container mx-auto rounded-md flex flex-col shadow-2xl p-6 -m-16 z-20 bg-white">
        <button class="btn btn--large btn--darky" @click="startQuestionnaire" :disabled="isDisabled">Commencer</button>
        <button class="btn" @click="nextQuestion">Next</button>
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
                        "E": "Intéragir avec tous le monde, y compris des inconnus",
                        "I": "Intéragir avec quelqu'un que tu connais"
                    },
                    "group": 1
                },
                {
                    "id": "5f9eac23df233730330f7798",
                    "title": "Dans les fêtes, tu es plutôt",
                    "responses": {
                        "E": "Celui qui reste tard avec une énergie croissante",
                        "I": "Celui qui part tôt avec moins d'énergie"
                    },
                    "group": 1
                }
            ],
            arrNumbers: [],
            disabled: false,
            currentQuestionId: "",
            currentQuestionObj: []
        }
    },

    methods: {
        async startQuestionnaire() {
            //generate new array of all questions
            this.questions.forEach((elm, index) => {
                this.arrNumbers.push(elm.id);
            })

            this.disabled = true;
            await this.selectQuestion(this.randomizeNumber());
            console.log('check 1')
            await this.currentQuestion();
            console.log('check 2')
        },

        randomizeNumber() {
            // randomize id in array
            const random = Math.floor(Math.random() * this.arrNumbers.length);
            return random, this.arrNumbers[random]
        },

        async selectQuestion(elm) {
            const index = this.arrNumbers.indexOf(elm);
            this.currentQuestionId = elm;

            if (index > -1) {
                this.arrNumbers.splice(index, 1);
            }
            console.log('elm ' + elm)
        },

        nextQuestion: function () {
            this.selectQuestion(this.randomizeNumber());
        },

        async currentQuestion() {
            this.questions.forEach((elm, index) => {
                if (elm.id === this.currentQuestionId) {
                    let data = {
                        "id": elm.id,
                        "title": elm.title,
                    }
                    this.currentQuestionObj.push(data)
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
