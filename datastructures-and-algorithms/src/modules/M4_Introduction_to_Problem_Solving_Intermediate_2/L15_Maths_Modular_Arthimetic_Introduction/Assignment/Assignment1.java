package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L15_Maths_Modular_Arthimetic_Introduction.Assignment;

public class Assignment1 {

  int solve(int A, int B, int C) {
    long ans = 1;

    for (int pow = 1; pow <= B; pow++) {
      ans = (ans % C * A % C) % C;
    }

    return (int) ans % C;
  }
}
