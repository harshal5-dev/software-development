package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L13_Bit_Manipulations_2.Assignment;

public class Assignment1 {

  int solve(int A, int B) {
    return ((A >> B) & 1) == 1 ? 1 : 0;
  }

  int solve1(int A, int B) {
    return (A & (1 << B)) != 0 ? 1 : 0;
  }

}
