//criando constante de gravidade
const gravidade = 0.6
//contrutor do
// sprite do player definindo as caracteristicas q precisa
class Sprite {
    constructor({ position, dimensions, velocity }){
        this.position = position
        this.velocity = velocity
        this.width = dimensions.width
        this.height = dimensions.height
    }
    //função pra desenhar o player
    draw(){
        ctx.fillStyle = "purple"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        if(this.isAttacking){
            ctx.fillStyle = "purple"
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    //funcao de update 
    update(){
        if(Math.ceil(this.position.y+this.height >= canvas.height)){
            this.onGround = true
        }else{
            this.onGround = false
        }


        if(this.position.y+this.height > canvas.height){
           this.position.y = canvas.height - this.height
           this.velocity.y = 0
        }else{
            if(!this.onGround) this.velocity.y += gravidade
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.attackBox.position.x = this.position.x
        this.attackBox.position.y = this.position.y

        this.draw()
    }

    attack(){
        if(this.onAttackCooldown) return 
        this.isAttacking = true

        setTimeout(() =>{
            this.isAttacking = false
        }, 100)
    }

    jump(){
        if(!this.onGround) return
        this.velocity.y -= 16
    }
}
/*
    classe que vai diferenciar o player imovel
    para ele em movimento seja andando, correndo ou lutando
*/

class Fighter extends Sprite{
    constructor({
        position,
        velocity,
        dimensions
    }) {
        super({
            position,
            velocity,
            dimensions
        })

        this.velocity = velocity
        this.width = dimensions.width
        this.height = dimensions.height

        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y,
            },
            width: 125,
            height: 50
        }

        //de attack

        this.isAttacking
        this.attackCooldown = 500
        this.onAttackCooldown

        // para arrumar o jump
        this.lastKeyPressed
        this.onGround
    }
    
}

//diz a posição e dimenções altura e largura do player inicialmente
const player = new Fighter({
    position: {
        x: 110,
        y: 110
    },
    velocity:{
        x: 0,
        y: 0
    },
    dimensions:{
        width: 50,
        height: 150
    }
})


