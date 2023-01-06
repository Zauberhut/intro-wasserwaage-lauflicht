function zeichne_pixel (position: number) {
    strip.clear()
    strip.setPixelColor(position - 3, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor(position - 2, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor(position - 1, neopixel.colors(NeoPixelColors.Orange))
    strip.setPixelColor(position, neopixel.colors(NeoPixelColors.Red))
    strip.setPixelColor(position + 1, neopixel.colors(NeoPixelColors.Orange))
    strip.setPixelColor(position + 2, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor(position + 3, neopixel.colors(NeoPixelColors.Green))
    strip.show()
}
input.onButtonPressed(Button.A, function () {
    if (direction == 1) {
        direction = 0
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        basic.clearScreen()
    } else {
        direction = 1
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.B, function () {
    if (_function == 1) {
        _function = 0
        basic.showLeds(`
            # . . . #
            # . . . #
            # # # # #
            # . . . #
            # . . . #
            `)
        basic.clearScreen()
    } else {
        _function = 1
        basic.showLeds(`
            . . . . .
            . # . # .
            # # # # #
            . # . # .
            . . . . .
            `)
        basic.clearScreen()
    }
})
let _function = 0
let direction = 0
let strip: neopixel.Strip = null
let strip_length = 60
strip = neopixel.create(DigitalPin.P2, strip_length, NeoPixelMode.RGB)
let previous_bubble_position = 0
let bubble_position = strip_length / 2
basic.forever(function () {
    if (_function == 0) {
        if (direction == 1) {
            bubble_position = Math.map(Math.constrain(input.acceleration(Dimension.X), -400, 400), -400, 400, 1, strip_length - 1)
        } else {
            bubble_position = Math.map(Math.constrain(input.acceleration(Dimension.X), -400, 400), -400, 400, strip_length - 1, 1)
        }
        basic.pause(50)
        if (Math.abs(bubble_position - previous_bubble_position) > 1) {
            zeichne_pixel(bubble_position)
            previous_bubble_position = bubble_position
        }
    } else {
        if (direction == 1) {
            bubble_position += Math.map(Math.constrain(input.acceleration(Dimension.X), -400, 400), -250, 250, -2, 2)
        } else {
            bubble_position += Math.map(Math.constrain(input.acceleration(Dimension.X), -400, 400), -250, 250, 2, -2)
        }
        if (bubble_position < 2) {
            bubble_position = strip_length - 2
        }
        if (bubble_position > strip_length - 2) {
            bubble_position = 2
        }
        zeichne_pixel(bubble_position)
        basic.pause(20)
    }
})
