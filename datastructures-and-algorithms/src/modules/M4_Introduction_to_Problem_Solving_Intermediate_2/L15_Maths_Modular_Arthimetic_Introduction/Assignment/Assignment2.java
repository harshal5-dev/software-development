package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L15_Maths_Modular_Arthimetic_Introduction.Assignment;

public class Assignment2 {

  int solve(int[] A, int B) {
    long pow = 1;
    int result = 0;
    int N = A.length;

    for (int num = N-1; num >= 0; num--) {
      int digit = A[num];
      long term = (digit * pow) % B;
      result = (int) (result + term) % B;
      pow = (pow % B * 10 % B) % B;
    }

    return result;
  }
}
