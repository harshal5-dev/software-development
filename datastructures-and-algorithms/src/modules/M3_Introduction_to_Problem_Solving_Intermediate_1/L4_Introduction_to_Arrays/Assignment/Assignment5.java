package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L4_Introduction_to_Arrays.Assignment;

public class Assignment5 {

  void reverse(int[] A, int s,int e) {
    int index = s;
    int jIndex = e;

    while (index < jIndex) {
      int temp = A[index];
      A[index] = A[jIndex];
      A[jIndex] = temp;

      index++;
      jIndex--;
    }
  }

  int[] solve(int[] A, int B) {
    int N = A.length;
    B = B % N;

    reverse(A, 0, N-1);
    reverse(A, 0, B-1);
    reverse(A, B, N-1);

    return A;
  }
}
