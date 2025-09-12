package main

import (
	"fmt"
	"myGoLang/myAlgorithms"
)

func main() {
	s := "([)]"
	fmt.Println(myAlgorithms.IsValidParentheses(s))
}
