package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L15_Maths_Modular_Arthimetic_Introduction.Assignment;

public class Assignment3 {

  int solve(int[] A) {
    long sum = 0;

    for (int ele: A) {
      sum += ele;
    }

    if (sum % 3 == 0) {
      return 1;
    }

    return 0;
  }
}
